import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubDomainService } from './subDomain.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    mobileQuery: MediaQueryList;
    subDomainUrl: any;
    businessNameCheck: boolean = false;
    title = 'healthcare-frontend-angular';
    private subscription: Subscription;
    subDomainInfo: any;
    isLoadingSubdomain: boolean = false;
    isDarkTheme: boolean = false;

    private _mobileQueryListener: () => void;

    constructor(private subDomainService: SubDomainService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit() {
        this.subDomainUrl = this.subDomainService.getSubDomainUrl(null);
        if (this.subDomainUrl) {
            this.isLoadingSubdomain = true;

            this.subDomainService.verifyBusinessName(this.subDomainUrl).subscribe();
            this.subscription = this.subDomainService.getSubDomainInfo().subscribe(domainInfo => {
                if (domainInfo && domainInfo.organization) {
                    this.businessNameCheck = true;
                    this.isLoadingSubdomain = true;
                    this.subDomainService.updateFavicon('data:image/png;base64,' + domainInfo.organization.faviconBase64);
                }
                else if (domainInfo) {
                    // this.router.navigate(['/invalid-domain'])
                    this.businessNameCheck = false
                    this.isLoadingSubdomain = false;
                }
            });
        } else {
            this.businessNameCheck = true;
            this.isLoadingSubdomain = true;
            this.router.navigate(['/webadmin'])
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }
}
