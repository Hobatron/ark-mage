import { Component, Inject } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CardType, Icon } from 'src/app/services/fb-wrapper.service';

export class CardEditData {
	public type: CardType;
	public card: any;

	constructor(card: any, type: CardType) {
		this.type = type;
		this.card = card;
	}
}

interface CardForm {
	id: FormControl<number>;
	cost: FormArray<FormControl<Icon>>;
	name: FormControl<string>;
	type: FormControl<string>;
	rules: FormControl<string>;
}

@Component({
	selector: 'app-card-edit-dialog',
	templateUrl: './card-edit-dialog.component.html',
	styleUrl: './card-edit-dialog.component.scss',
})
export class CardEditDialogComponent {
	form: FormGroup<CardForm>;
	cardType: CardType;
	CardType = CardType;

	constructor(
		public dialogRef: MatDialogRef<CardEditDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: CardEditData
	) {
		const tempCost = data.card?.costs || [];
		if (tempCost && tempCost.length != 0) {
			throw new Error('Cards with cost not implemented yet.');
		}
		this.form = new FormGroup<CardForm>({
			id: new FormControl(data?.card?.id, { nonNullable: true }),
			cost: new FormArray([...tempCost]),
			name: new FormControl(data?.card?.name),
			type: new FormControl(data?.card?.type),
			rules: new FormControl(data?.card?.rules),
		});

		this.cardType = data.type;
	}

	onSave(): void {
		this.dialogRef.close(this.form.getRawValue());
	}

	cancel(): void {
		this.dialogRef.close();
	}
}
