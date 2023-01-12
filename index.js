import {ajax} from 'rxjs/ajax';
import {catchError, debounceTime, EMPTY, filter, fromEvent, map, switchMap} from 'rxjs';
import {distinctUntilChanged} from "rxjs/src/internal/operators/distinctUntilChanged";

const input = document.querySelector('.input')
const stream$ = fromEvent(input, 'input')
const API_URL = 'https://api.github.com/search/repositories?q='


stream$
    .pipe(
        map(event => event.target.value),
        filter(value => value.trim() !== ""),
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap(value => {
            return ajax.getJSON(`${API_URL}${value}`).pipe(catchError(() => EMPTY))
        }))
    .subscribe(response => {
        const {total_count, items} = response
        console.log(total_count, items)
    })

const API_URL2 = 'https://gitlab.com/api/v4/projects?search='
const input2 = document.querySelector('.input2')
const stream2$ = fromEvent(input2, 'input2')
stream2$
    .pipe(
        map(event => event.target.value),
        filter(value => value.trim() !== ""),
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap(value => {
            return ajax.getJSON(`${API_URL2}${value}`).pipe(catchError(() => EMPTY))
        }))
    .subscribe(response => {
        const {total_count, items} = response
        console.log(total_count, items)
    })