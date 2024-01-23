import {
	Component,
	Input,
	OnChanges,
	OnInit,
	SimpleChanges,
} from '@angular/core';
import { CardConstants } from '../mainVariables';
import {
	CardType,
	FbWrapperService,
	Icon,
} from '../services/fb-wrapper.service';
import { MatDialog } from '@angular/material/dialog';
import {
	CardEditData,
	CardEditDialogComponent,
} from './card-edit-dialog/card-edit-dialog.component';

@Component({
	selector: 'app-card-main',
	templateUrl: './card-main.component.html',
	styleUrls: ['./card-main.component.scss'],
})
export class CardMainComponent implements OnInit {
	public isAction: boolean = false;
	public cardConsts = new CardConstants();
	public fontSize = 100;
	public cardStyle = {
		width: this.cardConsts.width + 'px',
		height: this.cardConsts.height + 'px',
		'background-color': '#000',
		display: 'grid',
		margin: this.cardConsts.cardSpacing + 'px',
	};
	@Input() public type: string = '';
	@Input() public cardType!: CardType;
	@Input() public costs: Icon[] = [];
	@Input() public name: string = '';
	@Input() public rules: string = '';
	@Input() public isEdit: boolean = false;
	@Input() public id: number = 0;

	constructor(public dialog: MatDialog, public fbWrapper: FbWrapperService) {}

	ngOnInit(): void {
		this.isAction = this.cardType == CardType.ACTION;
		this.calcFontSize();
	}

	calcFontSize(): void {
		const charCount = this.rules?.length || 0;
		switch (true && !this.isAction) {
			case charCount >= 0 && charCount <= 50:
				this.fontSize = 52;
				break;
			case charCount >= 51 && charCount <= 100:
				this.fontSize = 48;
				break;
			case charCount >= 101 && charCount <= 150:
				this.fontSize = 42;
				break;
			default:
				this.fontSize = 32;
				break;
		}
	}

	openDialog(): void {
		const dialogRef = this.dialog.open(CardEditDialogComponent, {
			data: {
				card: {
					type: this.type,
					costs: this.costs,
					name: this.name,
					rules: this.rules,
					id: this.id,
				},
				type: this.cardType,
			} as CardEditData,
		});
		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.fbWrapper.postCard(this.cardType, result);
			}
		});
	}
}
