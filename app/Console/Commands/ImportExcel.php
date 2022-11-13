<?php

namespace App\Console\Commands;

use App\Imports\EmployeeImport;
use Illuminate\Console\Command;

class ImportExcel extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:excel';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Laravel Excel Importer';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $items = [
            public_path('data/applied_arts.xlsx'),
            public_path('data/applied_sciences.xlsx'),
            public_path('data/built.xlsx'),
            public_path('data/business.xlsx'),
            public_path('data/centre_for_languages.xlsx'),
            public_path('data/engineering.xlsx'),
            public_path('data/non_teaching_junior_staff.xlsx'),
            public_path('data/non_teaching_senior_members.xlsx'),
            public_path('data/non_teaching_senior_staff.xlsx'),
            public_path('data/secondment_staff.xlsx'),
        ];

        $this->output->title('Starting import');

        foreach($items as $item){
            (new EmployeeImport)->withOutput($this->output)->import($item);
        }

        $this->output->success('Import successful');
    }
}
