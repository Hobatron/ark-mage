import { inject } from '@angular/core';
import { Observable, map } from 'rxjs';
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
	getDocs,
	updateDoc,
} from '@angular/fire/firestore';

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

	public postCard(cardType: CardType, card: any): void {
		switch (cardType) {
			case CardType.ACTION:
				this.postAction(card);
				break;
			case CardType.EQUIPMENT:
				this.postEquipment(card);
				break;
			case CardType.USABLE:
				this.postUsables(card);
				break;
			default:
				throw Error('Card type not recognized: ' + cardType);
		}
		// const q = query(this.equipmentsCollection, where('id', '==', card.id));
	}

	toSheets<T>(arr: T[]): T[][] {
		const chunks = [];
		for (let i = 0; i < arr.length; i += 9) {
			chunks.push(arr.slice(i, i + 9));
		}
		return chunks;
	}

	private async postAction(card: any) {
		const actionCard = {
			id: card.id,
			type: card.type,
			rules: card.rules,
		} as Action;
		const q = query(
			this.actionsCollection,
			where('id', '==', actionCard.id)
		);
		getDocs(q).then((r) => {
			updateDoc(r.docs[0].ref, actionCard);
		});
	}
	private postEquipment(card: any): void {
		const equipmentCard = {
			id: card.id,
			cost: card.cost,
			name: card.name,
			rules: card.rules,
			type: card.type,
		} as Equipment;
		const q = query(
			this.equipmentsCollection,
			where('id', '==', equipmentCard.id)
		);
		getDocs(q).then((r) => {
			updateDoc(r.docs[0].ref, equipmentCard);
		});
	}
	private postUsables(card: any): void {
		const usableCard = {
			id: card.id,
			slot: card.cost,
			name: card.name,
			rules: card.rules,
			type: card.type,
		} as Usable;
		const q = query(
			this.usablesCollection,
			where('id', '==', usableCard.id)
		);
		getDocs(q).then((r) => {
			updateDoc(r.docs[0].ref, usableCard);
		});
	}
}

export interface Icon {
	type: 'gem' | 'gold' | 'slot level' | 'dice';
	value: string;
}

export enum CardType {
	ACTION = 'action',
	EQUIPMENT = 'equipment',
	USABLE = 'usable',
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
