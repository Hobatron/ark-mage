import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CardConstants } from '../mainVariables';
import {
	Action,
	CardType,
	FbWrapperService,
} from '../services/fb-wrapper.service';

@Component({
	selector: 'app-actions',
	templateUrl: './actions.component.html',
	styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent implements OnInit {
	public actions$: Observable<Action[][]> | undefined;
	public cardConst: CardConstants = new CardConstants();
	public CardType = CardType;
	public sheetStyle = {
		padding: '126.5px 180px', //lets you print on normal print paper
		width:
			this.cardConst.cols * this.cardConst.width +
			this.cardConst.cardSpacing * this.cardConst.cols * 2 +
			'px',
		display: 'grid',
		'grid-template-columns': `${'1fr '.repeat(this.cardConst.cols)}`,
		gap: '0px 0px',
	};
	constructor(private csvService: FbWrapperService) {}

	ngOnInit(): void {
		this.actions$ = this.csvService.actions$;
	}
}
