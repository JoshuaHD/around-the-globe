<?php

namespace Database\Seeders;

use App\Models\Location;
use Illuminate\Database\Seeder;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $files = [
            'airports-extended.dat',
            'custom_locations.dat',
        ];

        $locationsCount = 0;
        foreach ($files as $file) {
            $path = database_path("seeders/data/{$file}");
            $rows = array_map('str_getcsv', file($path));
            $header = [
                'id',
                'name',
                'city',
                'country',
                'iata',
                'icao',
                'lat',
                'lng',
                'alt',
                'timezone',
                'dst',
                'tz',
                'type',
                'source',
            ];

            $mappedRows = [];

            foreach ($rows as $row) {
                if (count($row) != count($header)) {
                    continue;
                }

                $row = array_map(function ($col) {
                    if ($col === '\N') {
                        return null;
                    }

                    return $col;
                }, $row);

                $row = array_combine($header, $row);

                if (! $row['iata']) {
                    $row['iata'] = 'Z-'.$row['id'];
                }

                $mappedRows[] = $row;

                Location::createQuietly($row);
            }

            $this->command->info('Seeding '.$file);
            $insertedRowCount = count($mappedRows);
            $locationsCount += $insertedRowCount;
            $this->command->info("Seeded {$insertedRowCount} rows from {$file}");
        }

        $savedCount = Location::count();

        if ($savedCount < $locationsCount) {
            $this->command->warn("Expected to have {$locationsCount} but only inserted {$savedCount}");
        }
    }
}
