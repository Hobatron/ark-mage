import { Injectable, inject } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { Mapper } from '../mappers/mapper';
import { CardConstants } from '../mainVariables';

import {
	Firestore,
	collectionData,
	collection,
	addDoc,
	CollectionReference,
	query,
	where,
} from '@angular/fire/firestore';

@Injectable({
	providedIn: 'root',
})
export class FbWrapperService {
	firestore: Firestore = inject(Firestore);

	public cardConst: CardConstants = new CardConstants();
	actions$: Observable<Action[][]>;
	equipments$: Observable<Equipment[][]>;
	usables$: Observable<Usable[][]>;
	mapper: Mapper = new Mapper();
	public equipmentsCollection = collection(
		this.firestore,
		'equipments'
	) as CollectionReference<Equipment>;
	public actionsCollection = collection(
		this.firestore,
		'actions'
	) as CollectionReference<Action>;
	public usablesCollection = collection(
		this.firestore,
		'usables'
	) as CollectionReference<Usable>;

	constructor() {
		this.equipments$ = this.getEquipmentSheets();
		this.usables$ = this.getUsableSheets();
		this.actions$ = this.getActionSheets();
	}

	getUsableSheets(): Observable<Usable[][]> {
		return collectionData(this.usablesCollection).pipe(
			map((e) => {
				console.log(e);
				return this.toSheets(e);
			})
		);
	}

	getActionSheets(): Observable<Action[][]> {
		return collectionData(this.actionsCollection).pipe(
			map((e) => {
				console.log(e);
				return this.toSheets(e);
			})
		);
	}
	getEquipmentSheets(): Observable<Equipment[][]> {
		return collectionData(this.equipmentsCollection).pipe(
			map((e) => {
				console.log(e);
				return this.toSheets(e);
			})
		);
	}

	public createCard<T>(collection: CollectionReference<T>, card: T): void {
		addDoc(collection, card);
	}

	public async updateCard(card: Equipment) {
		const q = query(this.equipmentsCollection, where('id', '==', card.id));
	}

	toSheets<T>(arr: T[]): T[][] {
		const chunks = [];
		for (let i = 0; i < arr.length; i += 9) {
			chunks.push(arr.slice(i, i + 9));
		}
		return chunks;
	}
}

export interface Icon {
	type: 'gem' | 'gold' | 'slot level' | 'dice';
	value: string;
}

export interface Equipment {
	id: number;
	cost: Icon[];
	name: string;
	type: string;
	rules: string;
}

export interface Usable {
	id: number;
	name: string;
	slot: Icon[];
	type: string;
	rules: string;
}

export interface Action {
	id: number;
	type: string;
	rules: string;
}
