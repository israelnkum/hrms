<?php

namespace Database\Seeders;

use App\Models\Portfolio;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PortfolioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $portfolios = [
            ['name' => 'PRESIDENT', 'number'=> 1],
            ['name' => 'VICE PRESIDENT', 'number'=> 2],
            ['name' => 'SECRETARY', 'number'=> 3],
            ['name' => 'TREASURER', 'number'=> 4],
            ['name' => 'WOMEN\'S COMMISSIONER', 'number'=> 5],
            ['name' => 'GNUTS AMBASSADOR', 'number'=> 6]
        ];
        foreach ($portfolios as $portfolio) {
            Portfolio::updateOrCreate([
                'name' => $portfolio['name']
            ],[
                'id' => (string) Str::uuid(),
                'name' => $portfolio['name'],
                'number' => $portfolio['number']
            ]);
       }
    }
}
