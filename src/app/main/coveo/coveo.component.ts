import { AfterViewInit, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as Coveo from 'coveo-search-ui';
import { HostedSearchPage, IHostedSearchPageOptions, IHostedSearchPageState } from '@coveops/hosted-search-page';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'coveo-search',
    templateUrl: './coveo.component.html',
    styleUrls: ['./coveo.component.css'],
})
export class CoveoComponent implements OnInit, AfterViewInit {
    protected hash: string = "";
    protected state: any;

    @Input()
    public searchHub: string = "";

    @Input()
    public context: any = {};


    constructor(private route: ActivatedRoute) {
        
    }

    public ngOnInit() {    
        this.route.fragment.subscribe((hash: string | null) => {
            this.hash = hash?.toString() || "";
        });
    }

    private unserializeArray(item: string): string | string[] {
        if (!item.startsWith('[') && !item.endsWith(']')) {
            return item;
        }

        return item
            .replace('[', '')
            .replace(']', '')
            .split(',')
        ;
    }

    private unserializeValue(item: string): any {
        let value = this.unserializeArray(item);

        return value;
    }

    private convertHash(hash: string, excludedKeys: string[] = []): any {
        return hash.split('&').reduce((item: Record<string, any>, current: string) => {
            const [key, value] = current.split('=');

            if (excludedKeys.includes(key) || !value) {
                return item;
            }

            item[key] = this.unserializeValue(value);

            return item;
        }, {});
    }

    public async ngAfterViewInit(): Promise<void> {
        const hostedSearchPage = document.getElementById('hsp') as HostedSearchPage;
        const htmlOnly = false;

        const { orgId, pageId, apiKey, token } = environment.coveo;

        const options: IHostedSearchPageOptions = {
            orgId,
            apiKey,
            pageId,
            htmlOnly
        }

        try {
            await hostedSearchPage.configure(options);
        } catch (err) {
            console.error(err);
        }

        const root = document.getElementById("search") as HTMLElement;

        Coveo.$$(root).on(Coveo.InitializationEvents.restoreHistoryState, () => {
            localStorage.setItem('coveo-LocalStorageHistoryController', JSON.stringify({}));
            const state = this.convertHash(this.hash, ['fv']);
            Coveo.state(root, state);
        })

        Coveo.$$(root).on("state:change", (e, data) => {
            const hash = Coveo.HashUtils.encodeValues(data.attributes);
            window.location.replace(`#${hash}`);
        })

        Coveo.$$(root).on(Coveo.InitializationEvents.afterInitialization, () => {
            Coveo.$$(root).on(Coveo.QueryEvents.buildingQuery, (e, args: Coveo.IBuildingQueryEventArgs) => {
                args.queryBuilder.addContext(this.context);
            });
        });

        Coveo.SearchEndpoint.configureCloudV2Endpoint(orgId, token);
        Coveo.init(root, {
            SearchInterface: {
                useLocalStorageForHistory: true,
            },
            Analytics: {
                searchHub: this.searchHub,
            }
        });
    }
}
