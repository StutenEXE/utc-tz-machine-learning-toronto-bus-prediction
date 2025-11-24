import optuna
import pandas as pd
import numpy as np
import seaborn as sns
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import r2_score, accuracy_score, recall_score, f1_score
from sklearn.metrics import mean_absolute_error #  MAE
from sklearn.metrics import mean_squared_error  # RMSE
from sklearn.metrics import median_absolute_error # Erreur de la médiane absolue
from sklearn.metrics import confusion_matrix
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from xgboost import XGBRegressor

import matplotlib.pyplot as plt


df = pd.read_csv('./data/4_preprocessed_dataset.csv')

def eval_model(model, X_test, y_test):

    y_pred = model.predict(X_test)
    r2 = r2_score(y_test, y_pred)
    mae = mean_absolute_error(y_test, y_pred)
    rmse = mean_squared_error(y_test, y_pred)
    print(f"R2 : {r2:.4f} (the higher the better)")
    print(f"MAE : {mae:.4f} (the lower the better)")
    print(f"RMSE : {rmse:.4f} (the lower the better)")
    return  r2, mae, rmse

df = df.drop(columns=['remainder__WINDCHILL'])  # test
df = df.dropna()
# y = df[['DELAY_LOG1P']].squeeze()

X_train, X_val, y_train, y_val = train_test_split(df.drop(columns=["DELAY_LOG1P"]), df["DELAY_LOG1P"], test_size=0.2, random_state=99)

def objective_gradient_boosting(trial):
    model = GradientBoostingRegressor(
        n_estimators=trial.suggest_int('n_estimators', 100, 1000, step=100),
        learning_rate=trial.suggest_float('learning_rate', 1e-4, 1e-1, log=True),
        max_depth=trial.suggest_int('max_depth', 1, 10),
        min_samples_split=trial.suggest_int('min_samples_split', 2, 10),
        min_samples_leaf=trial.suggest_int('min_samples_leaf', 1, 10),
        subsample=trial.suggest_float('subsample', 0.1, 1.0, step=0.1),
        random_state=99
    )

    model.fit(X_train, y_train)
    r2, mae, rmse = eval_model(model, X_val, y_val)
    return rmse  # Optimize for RMSE 

def objective_xgboost(trial):
    param = {
        'verbosity': 0,
        'objective': 'reg:squarederror',
        'n_estimators': trial.suggest_int('n_estimators', 100, 1000, step=100),
        'learning_rate': trial.suggest_float('learning_rate', 1e-4, 1e-1, log=True),
        'max_depth': trial.suggest_int('max_depth', 1, 10),
        'subsample': trial.suggest_float('subsample', 0.1, 1.0, step=0.1),
        'colsample_bytree': trial.suggest_float('colsample_bytree', 0.1, 1.0, step=0.1),
        'random_state': 99
    }

    model = XGBRegressor(**param)
    model.fit(X_train, y_train)
    r2, mae, rmse = eval_model(model, X_val, y_val)
    return rmse  # Optimize for RMSE


study = optuna.create_study(direction="minimize", study_name=f"Delay prediction")
study.optimize(objective_xgboost, n_trials=100)
print("Best trial:")
trial = study.best_trial
print(f"  Value: {trial.value}")
print("  Params: ")
for key, value in trial.params.items():
    print(f"    {key}: {value}")

best_model = XGBRegressor(**trial.params, random_state=99)
best_model.fit(X_train, y_train)

y_pred = best_model.predict(X_val)

plt.figure(figsize=(6,6))
sns.scatterplot(x=y_val, y=y_pred, alpha=0.6)
plt.plot([y_val.min(), y_val.max()], [y_val.min(), y_val.max()], 'r--')
plt.xlabel('Actual values')
plt.ylabel('Predicted values')
plt.title(f'Predicted vs Actual (R² = {r2_score(y_val, y_pred):.3f})')
plt.show()