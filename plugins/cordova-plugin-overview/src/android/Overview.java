package com.doctolib.cordova.overview;

import android.app.ActivityManager;
import android.content.Context;
import android.graphics.Color;
import android.os.Build;

import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;

public class Overview extends CordovaPlugin {

  @Override
  public void initialize(CordovaInterface cordova, CordovaWebView webView) {
    super.initialize(cordova, webView);

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
      int color = Color.parseColor(preferences.getString("OverviewColor", "#000000"));

      ActivityManager activityManager = (ActivityManager) cordova.getActivity().getSystemService(Context.ACTIVITY_SERVICE);
      for (ActivityManager.AppTask appTask : activityManager.getAppTasks()) {
        if (appTask.getTaskInfo().id == cordova.getActivity().getTaskId()) {
          ActivityManager.TaskDescription description = appTask.getTaskInfo().taskDescription;
          cordova.getActivity().setTaskDescription(new ActivityManager.TaskDescription(description.getLabel(), description.getIcon(), color));
        }
      }
    }
  }
}
