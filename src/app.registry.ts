import { Injectable, InjectionToken } from '@nestjs/common';
import { ModulesContainer } from '@nestjs/core';

@Injectable()
export class AppRegistry {
  private providerMap = new Map<InjectionToken, any>();

  constructor(private readonly modulesContainer: ModulesContainer) {
    this.indexProviders();
  }

  private indexProviders() {
    for (const moduleRef of this.modulesContainer.values()) {
      for (const [token, provider] of moduleRef.providers) {
        this.providerMap.set(token, provider.instance);
      }
    }
  }

  getProvider<T>(token: string): T | null {
    return this.providerMap.get(token) || null;
  }
}
