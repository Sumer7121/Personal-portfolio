# BESS Battery Capacity Testing & Performance Analytics

An energy-storage analytics case study using capacity-test data from the **Williams Cap Tests.xlsx** workbook.

## Workflow
- Read sheet `610 - 528` with the second row as column headers.
- Clean missing and nonpositive energy readings and calculate charge/discharge cycles and round-trip efficiency (RTE).
- Generate warranty threshold indicators, charge/discharge ratio anomaly flags, and KPI summaries.
- Engineer features and train a scikit-learn LinearRegression model to estimate RTE; evaluate with MAE.
- Export `model.pkl`, `features.parquet`, `metrics.json`, and `ops_summary.csv`; plot actual vs predicted RTE and charge energy vs RTE.

**Stack:** Python, Pandas, NumPy, Scikit-learn, SciPy, Matplotlib, Joblib, Parquet, Excel.

## Methodology notes
The supplied notebook uses synthetic daily timestamps starting January 2023 where source dates are absent. Its seasonal grouping and week-by-week analysis are illustrative, **not** evidence of observed seasonal effects. The example cost-savings formula uses an assumed $0.10/kWh and should not be interpreted as verified financial savings. The RTE-based warranty threshold (95%) is a configurable analysis assumption rather than a verified equipment warranty. Ensure meter-adjustment formulas match the intended meter calibration convention before operational use.

The model includes features derived from the same energy readings used to calculate RTE, so its predictive performance should not be interpreted as a forward-looking forecast without leakage-aware validation.

## Data and reproducibility
The original Excel workbook is not published here. Replace the Kaggle-specific input path in the analysis notebook with a local copy of data you are authorized to use. Do not publish customer meter identifiers or proprietary operational measurements.

**Portfolio:** [Return to the portfolio](../../my-portfolio/README.md).
