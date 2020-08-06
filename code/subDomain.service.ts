import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, ReplaySubject, BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class SubDomainService {
    private subject = new BehaviorSubject<any>(null);
    constructor(private http: HttpClient) { }

    getSubDomainUrl(domainName: any) {
        // let redirectedSubDomain = localStorage.getItem('redirectedDomainName');
        // if (redirectedSubDomain) {
        //     localStorage.removeItem('redirectedDomainName');
        //     return redirectedSubDomain;
        // }

        let hostName = window.location.host;
        let subdomain = null;
        // @if running on localhost or on any specfic ip
        if (hostName === 'localhost:4200' || hostName === '75.126.168.31:6031' || hostName === '67.211.217.151:8001' || hostName === '66.23.226.162:8001' || hostName === '67.211.217.151:8002') {
            hostName = 'life.ascendhealthsystem.com';
        } //if your domain is vaild and login in super admin panel
        else if (hostName === 'ascendhealthsystem.com' || hostName === 'www.ascendhealthsystem.com' || hostName === 'ascendehr.com' || hostName === 'www.ascendehr.com') {
            history.pushState(null, null, '/webadmin/login');
        }// sub domain functionality
        const splitHostName = hostName.split('.');
        if (splitHostName.length >= 3) {
            if (splitHostName[0] != 'www' && domainName == null) {
                subdomain = splitHostName[0];
            } else if (domainName != null) {
                subdomain = domainName;
            }
        }
        console.log('subdomain', subdomain)
        return subdomain;
    }

    getSubDomainInfo(): Observable<any> {
        return this.subject.asObservable();
    }

    verifyBusinessName(domainName: string) {

        return this.http.get<any>(`${environment.api_url}/VerifyBusinessName?BusinessName=${domainName}`)
            .pipe(map(response => {
                if (response.statusCode === 200) {
                    localStorage.setItem('business_token', response.data.businessToken);
                    this.subject.next({ ...response.data });
                } else {
                    localStorage.removeItem('business_token');
                    this.subject.next({ ...response.data });
                }
            }));
    }

    updateFavicon(faviconUrl: string) {
        let link: any = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = faviconUrl;
        document.getElementsByTagName('head')[0].appendChild(link);
    }
}
