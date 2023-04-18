import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Router} from '@angular/router';
import {Subject, takeUntil} from 'rxjs';
import {ApexOptions} from 'ng-apexcharts';
import {DateTime, Duration} from 'luxon';
import {DecimalPipe} from '@angular/common';
import {FuseConfirmationService} from '../../../@fuse/services/confirmation';
import {DashboardService} from './dashboard.service';
import {DataSummaryViewModel} from './dashboard.models';
import {IoTData} from '../home/models/Iot-data.model';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, OnDestroy {
    public dataChartOptions: ApexOptions;
    public data: IoTData[] = [];
    public currentDateTime: DateTime = DateTime.now();
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(private _analyticsService: DashboardService,
                private _changeDetectorRef: ChangeDetectorRef,
                private _confirmationService: FuseConfirmationService,
                private _router: Router) {
    }

    // -----------------------------------------------------------------------------------------------------
    // ngOnInit
    // -----------------------------------------------------------------------------------------------------
    ngOnInit(): void {
        this._analyticsService.data$.pipe(takeUntil(this._unsubscribeAll)).subscribe((data: IoTData[]) => {
            this.data = data;
            this._prepareDeviceUsageChartData();
            this._changeDetectorRef.markForCheck();
        });

        // Attach SVG fill fixer to all ApexCharts
        window['Apex'] = {
            chart: {
                events: {
                    mounted: (chart: any, options?: any): void => {
                        this._fixSvgFill(chart.el);
                    },
                    updated: (chart: any, options?: any): void => {
                        this._fixSvgFill(chart.el);
                    }
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // On Destroy
    // -----------------------------------------------------------------------------------------------------
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // Fix the SVG fill references. This fix must be applied to all ApexCharts charts in order to fix
    // 'black color on gradient fills on certain browsers' issue caused by the '<base>' tag.
    // -----------------------------------------------------------------------------------------------------
    private _fixSvgFill(element: Element): void {
        // Current URL
        const currentURL = this._router.url;
        // 1. Find all elements with 'fill' attribute within the element
        // 2. Filter out the ones that doesn't have cross-references so we only left with the ones that use the 'url(#id)' syntax
        // 3. Insert the 'currentURL' at the front of the 'fill' attribute value
        Array.from(element.querySelectorAll('*[fill]'))
            .filter(el => el.getAttribute('fill').indexOf('url(') !== -1)
            .forEach((el) => {
                const attrVal = el.getAttribute('fill');
                el.setAttribute('fill', `url(${currentURL}${attrVal.slice(attrVal.indexOf('#'))}`);
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // Prepare the chart data from the data
    // -----------------------------------------------------------------------------------------------------
    private _prepareDeviceUsageChartData(): void {
        // DataUsage
        this.dataChartOptions = {
            chart: {
                animations: {
                    speed: 400,
                    animateGradually: {
                        enabled: false
                    }
                },
                fontFamily: 'inherit',
                foreColor: 'inherit',
                width: '100%',
                height: '100%',
                type: 'area',
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: false
                }
            },
            colors: ['#818CF8', '#dd00ff'],
            dataLabels: {
                enabled: false
            },
            fill: {
                colors: ['#312E81', '#602e81']
            },
            legend:{
              position: 'top'
            },
            grid: {
                show: true,
                borderColor: '#334155',
                padding: {
                    top: 10,
                    bottom: -40,
                    left: 0,
                    right: 0
                },
                position: 'back',
                xaxis: {
                    lines: {
                        show: true
                    }
                }
            },
            series: [
                {
                    name: 'Temperature',
                    data: this._analyticsService.convertTemperatureToDataPoints(this.data)
                },
                {
                    name: 'Humidity',
                    data: this._analyticsService.convertHumidityToDataPoints(this.data)
                }],
            stroke: {
                width: 2
            },
            tooltip: {
                followCursor: true,
                theme: 'dark',
                x: {
                    format: 'MMM dd, yyyy'
                },
                y: {
                    formatter(val: number, opts?: any): string {
                        return `${val}`;
                    }
                }
            },
            xaxis: {
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                crosshairs: {
                    stroke: {
                        color: '#475569',
                        dashArray: 0,
                        width: 2
                    }
                },
                labels: {
                    offsetY: -20,
                    style: {
                        colors: '#CBD5E1'
                    }
                },
                tickAmount: 20,
                tooltip: {
                    enabled: false
                },
                type: 'datetime'
            },
            yaxis: {
                axisTicks: {
                    show: true
                },
                axisBorder: {
                    show: true
                },
                min: 0,
                tickAmount: 3,
                show: false
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // Gets the usage by day
    // -----------------------------------------------------------------------------------------------------
    getData(days: number = null): void {
        const now = DateTime.now();
        const daysAgo = days !== null ? now.plus(Duration.fromObject({days: days})) : now.startOf('year');
        this._analyticsService.getData({
            from: daysAgo.toUTC().toISO(),
            to: now.toUTC().toISO()
        }).subscribe();
    }
}
