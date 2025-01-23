import * as fs from 'fs';

export class HtmlEditor {
    async generateDashboardCard(apiName: string, reportUrl: string, percentage: string | null, percentCircle: string | null, testCount: string | null, isOutdated: boolean): Promise<string> {
        let testsClass = "dashboard-green";
        if (isOutdated) {
            testsClass = "dashboard-red";
        }
        return `
            <div class="dashboard-card ${testsClass}">
                <div class="dashboard-header">${apiName.toUpperCase()}</div>
                <div class="dashboard-content">
                    <div class="chart" style="--percentage: ${percentage}">
                        <img src="${percentCircle}" alt="${percentage}" class="percentage-circle"></img>
                    </div>
                    <div class="test-count">
                        <a href="${reportUrl}" target="_blank">${testCount}</a>
                        <p>test cases</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    async saveHTMLFile(htmlContent: string, fileName: string = "dashboard.html"): Promise<void> {
        const completeHTML = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Dashboard</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                    }
                    .dashboard-container {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-around;
                        margin: 20px;
                    }
                    .dashboard-green {
                        border: 5px solid #97cc64;
                    }
                    .dashboard-red {
                        border: 5px solid #fd5a3e;
                    }
                    .dashboard-card {
                        width: 40%;
                        border-radius: 10px;
                        margin: 10px;
                        padding: 20px;
                        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
                    }
                    @media (max-width: 765px) {
                        .dashboard-card {
                            width: 100%;
                        }
                    }
                    .dashboard-header {
                        font-weight: bold;
                        margin: 0 10px 10px 10px;
                    }
                    .dashboard-content {
                        width: 90%;
                        height: 100%;
                        display: flex;
                        flex-direction: row;
                    }
                    .percentage-circle {
                        width: 100%;
                        height: 100%;
                    }
                    .test-count {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        text-align: center;
                        height: 150px;
                    }
                    .test-count a {
                        font-size: 40px;
                    }
                    .chart {
                        position: relative;
                        width: 150px;
                        height: 150px;
                        margin: 0 auto;
                    }
                    .chart-circle {
                        height: 100%;
                        left: 0;
                        position: absolute;
                        top: 0;
                        width: 100%;
                    }
                    .percentage-label {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        font-size: 20px;
                        font-weight: bold;
                    }
                    .chart__arc {
                        stroke: #fff;
                        stop-opacity: 0;
                    }
                    .chart__fill_status_passed {
                        fill: #97cc64;
                    }
                    .chart__fill_status_failed {
                        fill: #fd5a3e;
                    }
                    .chart__fill_status_broken {
                        fill: #ffd050;
                    }
                </style>
            </head>
            <body>
                <div class="dashboard-container">
                    ${htmlContent}
                </div>
            </body>
            </html>
        `;
    
        fs.writeFileSync(fileName, completeHTML, 'utf-8');
        console.log(`File saved as ${fileName}`);
    }
}
