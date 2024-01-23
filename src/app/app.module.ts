import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardMainComponent } from './card-main/card-main.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { FbWrapperService } from './services/fb-wrapper.service';
import { UsablesComponent } from './usables/usables.component';
import { IconComponent } from './icon/icon.component';
import { RulesTextComponent } from './rules-text/rules-text.component';
import { TilesComponent } from './tiles/tiles.component';
import { HexComponent } from './tiles/tile-page/tile/hex/hex.component';
import { TileComponent } from './tiles/tile-page/tile/tile.component';
import { TilePageComponent } from './tiles/tile-page/tile-page.component';
import { FightSvgComponent } from './svgs/fight-svg/fight-svg.component';
import { GemSvgComponent } from './svgs/gem-svg/gem-svg.component';
import { DiscoverSvgComponent } from './svgs/discover-svg/discover-svg.component';
import { MineSvgComponent } from './svgs/mine-svg/mine-svg.component';
import { HealSvgComponent } from './svgs/heal-svg/heal-svg.component';
import { ActionsComponent } from './actions/actions.component';
import { CardEditDialogComponent } from './card-main/card-edit-dialog/card-edit-dialog.component';

//**Angular/Firebase**
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

//**AngularMaterial**
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

//**Angular**
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextFieldModule } from '@angular/cdk/text-field';

const firebaseConfig = {
	apiKey: 'AIzaSyAylE6H4uUaW4RRzQgjJidn9GsfCBRPTFs',
	authDomain: 'ark-mage-a-new-dawn.firebaseapp.com',
	projectId: 'ark-mage-a-new-dawn',
	storageBucket: 'ark-mage-a-new-dawn.appspot.com',
	messagingSenderId: '377004910380',
	appId: '1:377004910380:web:28b7cc3c8012928c55ee89',
};

@NgModule({
	declarations: [
		AppComponent,
		CardMainComponent,
		EquipmentComponent,
		UsablesComponent,
		IconComponent,
		RulesTextComponent,
		TilesComponent,
		HexComponent,
		TileComponent,
		TilePageComponent,
		FightSvgComponent,
		GemSvgComponent,
		DiscoverSvgComponent,
		MineSvgComponent,
		HealSvgComponent,
		ActionsComponent,
		CardEditDialogComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		provideFirebaseApp(() => initializeApp(firebaseConfig)),
		provideFirestore(() => getFirestore()),
		MatDialogModule,
		ReactiveFormsModule,
		MatInputModule,
		BrowserAnimationsModule,
		TextFieldModule,
		MatButtonModule,
	],
	providers: [FbWrapperService],
	bootstrap: [AppComponent],
	exports: [CardMainComponent],
})
export class AppModule {}
