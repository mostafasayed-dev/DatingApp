import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

// const httpOptions = {
//   headers: new HttpHeaders({
//     Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
//   })
// }

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private baseUrl = environment.apiUrl;
  private members: Member[] = [];// to save state without need to send an api request every time

  constructor(private http: HttpClient) { }

  getMembers(){
    if(this.members.length > 0) return of(this.members);// return an observable with members data
    return this.http.get<Member[]>(this.baseUrl + "users").pipe(// to access observable data
      map(members => {
        this.members = members;
        return members;
      })
    )
  }

  getMember(username: string){
    const member = this.members.find(x => x.username === username);
    if(member !== undefined) return of(member);
    return this.http.get<Member>(this.baseUrl + "users/" + username);
  }

  updateMember(member: Member){
    return this.http.put(this.baseUrl + "users", member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }
}
