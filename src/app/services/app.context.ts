import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Context } from '../models/context.model';

@Injectable({
    providedIn: "root"
})
export class AppContext {
    private contextBehaviour: BehaviorSubject<Context> = new BehaviorSubject<Context>({gameMode: "human"});

    contextObservable$: Observable<Context> = this.contextBehaviour.asObservable();

    constructor(){

    }

    updateGameMode(context: Context) {
        this.contextBehaviour.next(context);
    }


}