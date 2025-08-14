
import { SaffronColumnType, SaffronTableColumn } from '../../../_01-components/_15-saffron-table/saffron-table-public-api';
import { saffronUUID } from '../../../_01-components/_16-saffron-utils/saffron-uuid';
import { TransferTemplate } from './transfer-template.model';

export class TransferTemplateTableConfig {
  rows: TransferTemplate[] = [];
  columns: SaffronTableColumn[] = [];

  constructor() {
    this.fillRows();
    this.setColumns();
  }

  private fillRows() {
    this.rows = [];
    this.rows.push({
      position: 1,
      id: saffronUUID(),
      beyneBanki: 9000000000,
      beyneHesabhayeKhod: 9000000000,
      daroonBanki: 9000000000,
    });
    this.rows.push({
      position: 2,
      id: saffronUUID(),
      beyneBanki: 5000000000,
      beyneHesabhayeKhod: 5000000000,
      daroonBanki: 5000000000,
    });
    this.rows.push({
      position: 3,
      id: saffronUUID(),
      beyneBanki: 4000000000,
      beyneHesabhayeKhod: 4000000000,
      daroonBanki: 4000000000,
    });
  }

  private setColumns() {
    this.columns = [
      {
        field: 'position',
        title: 'ردیف',
        columnType: SaffronColumnType.positionColumn,
        width: '5rem',
      },
      {
        field: 'apply',
        title: 'اعمال الگو',
        columnType: SaffronColumnType.actionColumn,
        actionColumnData: [
          {
            id: 'daily',
            imageUrl:
              '/saffron-icons/01-transfer/daily-icon.png',
            imageWidthPx: '24px',
            imageHeightPx: '24px',
            toolTip: 'سقف روزانه',
            toolTipPosition: 'right',
          },
          {
            id: 'monthly',
            imageUrl: '/saffron-icons/01-transfer/monthly-icon.png',
            imageWidthPx: '24px',
            imageHeightPx: '24px',
            toolTip: 'سقف ماهانه',
            toolTipPosition: 'left',
          },
        ],
        width: '10rem',
      },
      {
        field: 'beyneBanki',
        title: 'بین بانکی',
        columnType: SaffronColumnType.number,
        sortable: false,
        filterable: false,
      },
      {
        field: 'beyneHesabhayeKhod',
        title: 'بین بانکی',
        columnType: SaffronColumnType.number,
        sortable: false,
        filterable: false,
      },
      {
        field: 'daroonBanki',
        title: 'بین بانکی',
        columnType: SaffronColumnType.number,
        sortable: false,
        filterable: false,
      },
      {
        field: 'edits',
        title: 'ویرایش',
        columnType: SaffronColumnType.actionColumn,
        actionColumnData: [
          {
            id: 'edit',
            icon: 'edit_note',
            toolTip: 'ویرایش',
            toolTipPosition: 'right',
          },
          {
            id: 'delete',
            icon: 'delete_outline',
            toolTip: 'حذف',
            toolTipPosition: 'left',
          },
        ],
        width: '10rem',
      },
    ];
  }
}
