import { ConfigService } from './../../../../core/singleton-services/config/config.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  public envName!: string;
  public production!: boolean;
  public apiBaseUrl!: string;

  constructor(private configService: ConfigService) { }

  ngOnInit(): void {
    this.envName = this.configService.envName;
    this.production = this.configService.production;
    this.apiBaseUrl = this.configService.apiBaseUrl;
  }
}
