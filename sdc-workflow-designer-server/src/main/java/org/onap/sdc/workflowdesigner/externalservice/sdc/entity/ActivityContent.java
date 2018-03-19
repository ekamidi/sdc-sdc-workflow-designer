/**
 * Copyright (c) 2018 ZTE Corporation.
 * All rights reserved. This program and the accompanying materials
 * are made available under the Apache License, Version 2.0
 * and the Eclipse Public License v1.0 which both accompany this distribution,
 * and are available at http://www.eclipse.org/legal/epl-v10.html
 * and http://www.apache.org/licenses/LICENSE-2.0
 *
 * Contributors:
 *     ZTE - initial API and implementation and/or initial documentation
 */
package org.onap.sdc.workflowdesigner.externalservice.sdc.entity;

import com.google.gson.annotations.SerializedName;

/**
 *
 */
public class ActivityContent {
  @SerializedName("class")
  private String clazz;
  
  private String scriptFormat;
  
  private String script;

  /**
   * @return the clazz
   */
  public String getClazz() {
    return clazz;
  }

  /**
   * @param clazz the clazz to set
   */
  public void setClazz(String clazz) {
    this.clazz = clazz;
  }

  /**
   * @return the scriptFormat
   */
  public String getScriptFormat() {
    return scriptFormat;
  }

  /**
   * @param scriptFormat the scriptFormat to set
   */
  public void setScriptFormat(String scriptFormat) {
    this.scriptFormat = scriptFormat;
  }

  /**
   * @return the script
   */
  public String getScript() {
    return script;
  }

  /**
   * @param script the script to set
   */
  public void setScript(String script) {
    this.script = script;
  }
  
  
}
