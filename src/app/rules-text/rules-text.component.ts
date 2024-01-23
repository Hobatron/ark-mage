import {
	Component,
	Input,
	OnChanges,
	OnInit,
	SimpleChanges,
} from '@angular/core';
import { Mapper } from '../mappers/mapper';
import { Icon } from '../services/fb-wrapper.service';

@Component({
	selector: 'app-rules-text',
	templateUrl: './rules-text.component.html',
	styleUrls: ['./rules-text.component.scss'],
})
export class RulesTextComponent implements OnChanges {
	@Input() rules?: string;
	@Input() fontSize!: number;

	public splitRules: string[] = [];
	public mapper = new Mapper();
	public resourceCosts: Array<Icon[] | undefined> = [];
	rulesIconToTextRatio = 42 / 32; //magic number from what looks decent

	constructor() {}

	ngOnChanges(changes: SimpleChanges): void {
		this.calcSplitRules();
	}

	private calcSplitRules(): void {
		this.resourceCosts = [];
		if (!this.rules) {
			this.rules = '';
		}
		this.splitRules = this.rules.split(/(\{.*?\})/g);
		this.splitRules.forEach((partialRule, i) => {
			if (partialRule.charAt(0) == '{') {
				this.resourceCosts.push(
					this.mapper.cost(this.splitRules.splice(i, 1)[0])
				);
			}
		});
		this.splitRules.forEach((r, i) => {
			this.splitRules[i] = r.replace(/:N/g, '<br>');
		});
	}
}
