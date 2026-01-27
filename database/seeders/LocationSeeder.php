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

        foreach ($files as $file) {
            $path = database_path("seeders/data/${file}" );
            $rows = array_map('str_getcsv', file($path));
            $header = [
                "id",
                "name",
                "city",
                "country",
                "iata",
                "icao",
                "lat",
                "lng",
                "alt",
                "timezone",
                "dst",
                "tz",
                "type",
                "source",
            ];

            $mapped_rows = [];

            foreach ($rows as $row) {
                if (count($row) != count($header))
                    continue;
                //dd([$header, $row]);
                $mapped_rows[] = array_combine($header, $row);
            }

            $this->command->info("Seeding " . $file);
            Location::insertOrIgnore($mapped_rows);
            $inserted_row_count = count($mapped_rows);
            $this->command->info("Seeded ${inserted_row_count} rows from ${file}");
        }
    }
}
