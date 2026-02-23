import pandas as pd
import os
LOG_FILE="../traffic_log.csv"

def get_dashboard_data():
    if not os.path.exists(LOG_FILE):
        return{
            "total_alert":0,
            "attack_counts":{},
            "severity_counts":{},
            "recent_alerts":{},
            "top_sources":{}
        }
    df=pd.read_csv(LOG_FILE)
    df.columns=df.columns.str.strip() #clean col names
    total_alerts=len(df)
    attack_counts=df["ALERT_TYPE"].value_counts().to_dict() #converting to a dictionary
    severity_counts=df["SEVERITY_LEVEL"].value_counts().to_dict()
    top_sources=df["SOURCE_IP"].value_counts().head(5).to_dict()
    recent_alerts=df.tail(10).to_dict(orient="records")
    return{
        "total_alerts":total_alerts,
        "attack_counts":attack_counts,
        "severity_counts":severity_counts,
        "top_sources":top_sources,
        "recent_alerts":recent_alerts
    }
