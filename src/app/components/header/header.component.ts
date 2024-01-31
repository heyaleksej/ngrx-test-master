import { Component } from '@angular/core';

interface ITab {
  label:string
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  tabs: ITab[] = [
    {label: 'О платформе'},
    {label: 'Загрузка пользователей'},
    {label: 'Список пользователей'}
  ];
  activeTab: number = 2;
  constructor() {}
}
