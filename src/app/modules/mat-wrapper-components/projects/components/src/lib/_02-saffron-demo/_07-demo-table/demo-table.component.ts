import { Component } from '@angular/core';

import { DemoTableConfig } from './models/demo-table-config';
import { DemoTableModel } from './models/demo-table-model';
import { TransferTemplateTableConfig } from './models/transfer-template-table.config';
import { defaultPageSizeOptions, SaffronActionColumnEvent, SaffronTableColumn, SaffronTableComponent, SaffronTableDataClick } from '../../_01-components/_15-saffron-table/saffron-table-public-api';
import { SaffronFieldsetDirective } from '../directives/fieldset-directive/fieldset.directive';
@Component({
  selector: 'demo-table',
  templateUrl: './demo-table.component.html',
  styleUrls: ['./demo-table.component.scss'],
  providers: [DemoTableConfig, TransferTemplateTableConfig],
  standalone: true,
  imports: [SaffronTableComponent,SaffronFieldsetDirective]
})
export class DemoTable {
  public pageSizeOptions: number[] = defaultPageSizeOptions;
  public rows: DemoTableModel[] = [];
  public columns: SaffronTableColumn[] = [];
  public transferRows: DemoTableModel[] = [];
  public transferColumns: SaffronTableColumn[] = [];
  totalCount = 50;

  constructor(
    private tableConfig: DemoTableConfig,
    private transferTableConfig: TransferTemplateTableConfig
  ) {
    this.rows = this.tableConfig.rows;
    this.columns = this.tableConfig.columns;
    (window as any).DemoTable = this;

    this.transferColumns = this.transferTableConfig.columns;
    this.transferRows = this.transferTableConfig.rows;
  }

  public onActionClicked(actionEvent: SaffronActionColumnEvent) {
    alert(actionEvent?.actionColumnData?.toolTip);
  }

  public dataClicked(dataClicked: SaffronTableDataClick<DemoTableModel>) {
    alert(
      `data clicked\n rowIndex : ${dataClicked.rowIndex}\n column field: ${dataClicked.column.field}`
    );
  }
}
