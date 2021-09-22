import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExercisePage } from './exercise.page/exercise.page';
import { ExerciseRoutingModule } from './exercise-routing.module';
import { IonicModule } from '@ionic/angular';
import { ExerciseSettingsPage } from './exercise.page/components/exercise-settings.page/exercise-settings.page';
import { ReactiveFormsModule } from '@angular/forms';
import { AnswerIndicationComponent } from './exercise.page/components/answer-indication/answer-indication.component';
import { ListSelectComponent } from './exercise.page/components/exercise-settings.page/components/included-answers/list-select.component';

@NgModule({
  declarations: [
    ExercisePage,
    ExerciseSettingsPage,
    AnswerIndicationComponent,
    ListSelectComponent,
  ],
  imports: [
    CommonModule,
    ExerciseRoutingModule,
    IonicModule,
    ReactiveFormsModule,
  ]
})
export class ExerciseModule { }
