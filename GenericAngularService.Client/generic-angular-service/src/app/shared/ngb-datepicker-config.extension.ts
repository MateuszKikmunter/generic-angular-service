import { Injectable } from '@angular/core';
import { NgbDatepickerConfig } from "@ng-bootstrap/ng-bootstrap";

@Injectable()
export class NgbDatepickerConfigExtension extends NgbDatepickerConfig {

    public configureMinDate(day: number, month: number, year: number): void {
        this.minDate = {
            day: day,
            month: month,
            year: year
        }
    }

    public configureMaxDate(day: number, month: number, year: number): void {
        this.maxDate = {
            day: day,
            month: month,
            year: year
        }
    }

    public bindInputToValue(value: Date): any {
        return {
            day: value.getDate(),
            month: value.getMonth() + 1,
            year: value.getFullYear()
        }
    }
}