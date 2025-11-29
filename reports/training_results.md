# Training results

## Scenario 1 model testing

* Train (60%)/Validation (20%)/Test (20%) split with Train for training models, Validation for hyperparameters optimisation and Test for final testing
* Season variable created (Summer/Winter)
* WINDCHILL REMOVED
* ALL NAN VALUES REMOVED

* Following transformations

```py
('yeo_johnson', PowerTransformer(method='yeo-johnson'), yeo_johnson_columns),
('numerical', StandardScaler(), numerical_columns),
('nominal', OneHotEncoder(), nominal_columns),
('ordinal', OrdinalEncoder(categories=ordinal_categories), ordinal_columns),
('multi_label', MultiLabelBinarizerWrapper(), multi_label_columns),
('passthrough', 'passthrough', passthrough_columns)
```

With : 
* `yeo_johnson_columns`: WINDCHILL
* `numerical_columns`: TEMP, DEW_POINT_TEMP, HUMIDEX, RELATIVE_HUMIDITY, STATION_PRESSURE, WINDCHILL, WIND_SPEED
* `nominal_columns`: ROUTE, SEASON
* `ordinal_columns`: VISIBILITY
* `multi_label_columns`: WEATHER_ENG_DESC_LIST
* `passthrough_columns`: LOCAL_TIME_HOUR_COS, LOCAL_TIME_HOUR_SIN, LOCAL_TIME_MINUTE_COS, LOCAL_TIME_MINUTE_SIN, WEEK_DAY_COS, WEEK_DAY_SIN, LOCAL_MONTH_COS, LOCAL_MONTH_SIN, LOCAL_DAY_COS, LOCAL_DAY_SIN, WIND_DIRECTION_COS, WIND_DIRECTION_SIN, PRECIP_AMOUNT_BINARY

We are trying to minimise the **RMSE** with optuna on **100 trials**.

### Decision Tree

**Parameters :**

```py
params = {
    "criterion": trial.suggest_categorical("criterion", ["squared_error", "friedman_mse", "absolute_error", "poisson"]),
    "splitter": trial.suggest_categorical("splitter", ["best", "random"]),
    "max_depth": trial.suggest_int("max_depth", 1, 50),
    "min_samples_split": trial.suggest_int("min_samples_split", 2, 20),
    "min_samples_leaf": trial.suggest_int("min_samples_leaf", 1, 20),
    "min_weight_fraction_leaf": trial.suggest_float("min_weight_fraction_leaf", 0.0, 0.5),
    "max_features": trial.suggest_categorical("max_features", [None, "sqrt", "log2"]),
    "max_leaf_nodes": trial.suggest_int("max_leaf_nodes", 2, 1000),
    "min_impurity_decrease": trial.suggest_float("min_impurity_decrease", 0.0, 1.0),
    "ccp_alpha": trial.suggest_float("ccp_alpha", 0.0, 0.1),
}
```
**Results :** 

```py
params = {
    "criterion": "friedman_mse",
    "splitter": "best",
    "max_depth": 50,
    "min_samples_split": 4,
    "min_samples_leaf": 13,
    "min_weight_fraction_leaf": 0.0033452675658135274
    "max_features": "None",
    "max_leaf_nodes": 958,
    "min_impurity_decrease": 0.02717264524131216
    "ccp_alpha": 0.00022805644365578618,
}
```

* **R2 :** 0.1184
* **MAE :** 0.5427
* **RMSE :** 0.8220

### Random Forest

**Parameters :**

```py
params = {
    "n_estimators": trial.suggest_int("n_estimators", 50, 600),
    "criterion": trial.suggest_categorical(
        "criterion", ["squared_error", "absolute_error", "friedman_mse", "poisson"]
    ),
    "max_depth": trial.suggest_int("max_depth", 2, 40),
    "min_samples_split": trial.suggest_int("min_samples_split", 2, 20),
    "min_samples_leaf": trial.suggest_int("min_samples_leaf", 1, 20),
    "min_weight_fraction_leaf": trial.suggest_float("min_weight_fraction_leaf", 0.0, 0.5),
    "max_features": trial.suggest_categorical(
        "max_features", ["sqrt", "log2", None]
    ),
    "max_leaf_nodes": trial.suggest_int("max_leaf_nodes", 100, 5000),
    "min_impurity_decrease": trial.suggest_float("min_impurity_decrease", 0.0, 1.0),
    "bootstrap": trial.suggest_categorical("bootstrap", [True, False]),
    "oob_score": trial.suggest_categorical("oob_score", [False, True]),
    "ccp_alpha": trial.suggest_float("ccp_alpha", 0.0, 0.1)
}
```
**Results :** 

```py
params = {
    "n_estimators": ,
    "criterion": ,
    "max_depth": ,
    "min_samples_split": ,
    "min_samples_leaf": ,
    "min_weight_fraction_leaf": ,
    "max_features": ,
    "max_leaf_nodes": ,
    "min_impurity_decrease": t,
    "bootstrap": ,
    "oob_score": ,
    "ccp_alpha": 
}
```

* **R2 :**
* **MAE :** 
* **RMSE :** 

### Gradient Boosting

**Parameters :**

```py
params = {
    "loss": trial.suggest_categorical(
        "loss", ["squared_error", "absolute_error", "huber", "quantile"]
    ),
    "learning_rate": trial.suggest_float("learning_rate", 0.001, 0.3, log=True),
    "n_estimators": trial.suggest_int("n_estimators", 50, 800),
    "subsample": trial.suggest_float("subsample", 0.5, 1.0),
    "criterion": trial.suggest_categorical(
        "criterion", ["friedman_mse", "squared_error"]
    ),
    "min_samples_split": trial.suggest_int("min_samples_split", 2, 20),
    "min_samples_leaf": trial.suggest_int("min_samples_leaf", 1, 20),
    "min_weight_fraction_leaf": trial.suggest_float("min_weight_fraction_leaf", 0.0, 0.3),
    "max_depth": trial.suggest_int("max_depth", 2, 10),
    "max_features": trial.suggest_categorical(
        "max_features", ["sqrt", "log2", None]
    ),
    "min_impurity_decrease": trial.suggest_float("min_impurity_decrease", 0.0, 1.0),
    "alpha": trial.suggest_float("alpha", 0.01, 0.99),  # used for quantile/huber losses
}
```

**Results :** 

```py
params = {
    "loss": "absolute_error",
    "learning_rate": 0.1551465082624317,
    "n_estimators": 668,
    "subsample": 0.7581874657515352,
    "criterion": "friedman_mse",
    "min_samples_split": 14,
    "min_samples_leaf": 3,
    "min_weight_fraction_leaf": 0.00044495333104902564,
    "max_depth": 9,
    "max_features": "log2",
    "min_impurity_decrease": 0.464576952022587,
    "alpha": 0.571665153181058
}
```

* **R2 : 0.1675** 
* **MAE : 0.4600** 
* **RMSE : 0.7763** 

### Extreme Gradient Boosting

**Parameters :**

```py
params = {
    "n_estimators": trial.suggest_int("n_estimators", 200, 1500),
    "learning_rate": trial.suggest_float("learning_rate", 1e-4, 0.3, log=True),
    # Tree parameters
    "max_depth": trial.suggest_int("max_depth", 2, 12),
    "min_child_weight": trial.suggest_float("min_child_weight", 1e-3, 10.0, log=True),
    "gamma": trial.suggest_float("gamma", 0.0, 10.0),
    "max_delta_step": trial.suggest_int("max_delta_step", 0, 10),
    # Regularization
    "reg_alpha": trial.suggest_float("reg_alpha", 1e-8, 10.0, log=True),
    "reg_beta": trial.suggest_float("reg_lambda", 1e-8, 10.0, log=True),
    # Subsampling
    "subsample": trial.suggest_float("subsample", 0.5, 1.0),
    "colsample_bytree": trial.suggest_float("colsample_bytree", 0.5, 1.0),
    "colsample_bylevel": trial.suggest_float("colsample_bylevel", 0.5, 1.0),
    "colsample_bynode": trial.suggest_float("colsample_bynode", 0.5, 1.0),
    # Booster & misc.
    "booster": trial.suggest_categorical("booster", ["gbtree", "dart"]),
    "tree_method": "auto",
    "random_state": 99,
    "n_jobs": -1,
}
# DART-specific parameters
if params["booster"] == "dart":
    params.update({
        "sample_type": trial.suggest_categorical("sample_type", ["uniform", "weighted"]),
        "normalize_type": trial.suggest_categorical("normalize_type", ["tree", "forest"]),
        "rate_drop": trial.suggest_float("rate_drop", 0.0, 0.3),
        "skip_drop": trial.suggest_float("skip_drop", 0.0, 0.7),
    })
```

**Results :** 

> FOR THESE RESULTS, DART BOOSTER WAS REMOVED

```py
params = {
    "n_estimators": 718,
    "learning_rate": 0.1378845274673234,
    "max_depth": 3,
    "min_child_weight": 5.779363234001181,
    "gamma": 1.3347316990873304,
    "max_delta_step": 1,
    "reg_alpha": 0.5116514543542413,
    "reg_lambda": 0.26770415074019227,
    "subsample": 0.8990198028208541,
    "colsample_bytree": 0.9910918190899611,
    "colsample_bylevel": 0.7807303399482364,
    "colsample_bynode": 0.7535982152586627,
    "booster": "gbtree"
}
```

* **R2 :** 0.1710
* **MAE :** 0.5046
* **RMSE :** 0.7730

### Support Vector Regression (SVR)

**Parameters :**

```py
kernel = trial.suggest_categorical("kernel", ["rbf", "poly", "sigmoid", "linear"])
params = {
    "kernel": kernel,
    "C": trial.suggest_float("C", 1e-3, 1e3, log=True),
    "epsilon": trial.suggest_float("epsilon", 1e-4, 1.0, log=True),
    "shrinking": trial.suggest_categorical("shrinking", [True, False]),
    "gamma": trial.suggest_categorical("gamma", ["scale", "auto"]),
}
# Kernel-specific parameters
if kernel == "poly":
    params["degree"] = trial.suggest_int("degree", 2, 5)
    params["coef0"] = trial.suggest_float("coef0", 0.0, 1.0)
elif kernel == "sigmoid":
    params["coef0"] = trial.suggest_float("coef0", 0.0, 1.0)
```

**Results :** 

```py
params = {
    
}
```

* **R2 :** 
* **MAE :** 
* **RMSE :** 