import { Component } from '@angular/core';
import { ApiClientService } from './api-client.service';
import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'paymash-test-task';
  private apiClient: ApiClientService;

  constructor(apiClient: ApiClientService) {
    this.apiClient = apiClient;
    this.loadFriends();
  }

  public async loadFriends(): Promise<void> {
    try {
      const movies = await this.apiClient.get<any>(environment.api);
      console.log(movies);

    } catch (error) {
      console.error(error);
    }
  }
}
