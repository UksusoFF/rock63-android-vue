package com.uksusoff.rock63;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.bugsnag.android.Bugsnag;
import com.bugsnag.android.performance.BugsnagPerformance;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Bugsnag.start(this);
        BugsnagPerformance.start(this);
    }

}
