/**
 * Copyright (c) 2017-2018 ZTE Corporation.
 * All rights reserved. This program and the accompanying materials
 * are made available under the Apache License, Version 2.0
 * and the Eclipse Public License v1.0 which both accompany this distribution,
 * and are available at http://www.eclipse.org/legal/epl-v10.html
 * and http://www.apache.org/licenses/LICENSE-2.0
 *
 * Contributors:
 *     ZTE - initial API and implementation and/or initial documentation
 */
package org.onap.sdc.workflowdesigner.utils;

import static org.junit.Assert.assertEquals;

import java.io.File;
import java.io.IOException;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

/**
 *
 */
public class FileCommonUtilsTest {

  /**
   * @throws java.lang.Exception
   */
  @Before
  public void setUp() throws Exception {}

  /**
   * @throws java.lang.Exception
   */
  @After
  public void tearDown() throws Exception {}

  /**
   * Test method for {@link org.onap.sdc.workflowdesigner.utils.FileCommonUtils#readLines(java.io.InputStream)}.
   */
  @Test
  public void testReadLines() {
  }

  /**
   * Test method for {@link org.onap.sdc.workflowdesigner.utils.FileCommonUtils#readString(java.io.InputStream)}.
   */
  @Test
  public void testReadStringInputStream() {
  }

  /**
   * Test method for {@link org.onap.sdc.workflowdesigner.utils.FileCommonUtils#readString(java.lang.String)}.
   */
  @Test
  public void testReadStringString() {
    String fileName = "src\\test\\resources\\workflow\\template-test.bpmn20.xml";
    File file = new File(fileName);
    if (file.exists()) {
      try {
        String s = FileCommonUtils.readString(fileName);
        FileCommonUtils.write("test.xml", s);
        assertEquals(s.isEmpty(), false);
      } catch (IOException e) {
      }
    }
  }

  /**
   * Test method for {@link org.onap.sdc.workflowdesigner.utils.FileCommonUtils#saveFile(java.io.InputStream, java.lang.String, java.lang.String)}.
   */
  @Test
  public void testSaveFile() {
  }

  /**
   * Test method for {@link org.onap.sdc.workflowdesigner.utils.FileCommonUtils#writetoAbsoluteFile(java.lang.String, java.lang.String, java.lang.String)}.
   */
  @Test
  public void testWritetoAbsoluteFileStringStringString() {
    String fileName = "test1.json";
    String content = "{\"aaa\": \"节点\"}";

    try {
      FileCommonUtils.writetoAbsoluteFile(".", fileName, content);
      String s = FileCommonUtils.readString(fileName);
      assertEquals(s, content);
    } catch (IOException e) {
    }
  }

  /**
   * Test method for {@link org.onap.sdc.workflowdesigner.utils.FileCommonUtils#writetoAbsoluteFile(java.lang.String, java.lang.String, java.lang.String, java.lang.String)}.
   */
  @Test
  public void testWritetoAbsoluteFileStringStringStringString() {
  }

  /**
   * Test method for {@link org.onap.sdc.workflowdesigner.utils.FileCommonUtils#write(java.lang.String, java.lang.String)}.
   */
  @Test
  public void testWriteStringString() {
    String fileName = "test.json";
    String content = "{\"aaa\": \"节点\"}";

    try {
      FileCommonUtils.write(fileName, content);
      String s = FileCommonUtils.readString(fileName);
      assertEquals(s, content);
    } catch (IOException e) {
    }
  }

  /**
   * Test method for {@link org.onap.sdc.workflowdesigner.utils.FileCommonUtils#write(java.lang.String, java.lang.String, java.lang.String, java.lang.String)}.
   */
  @Test
  public void testWriteStringStringStringString() {
  }

  /**
   * Test method for {@link org.onap.sdc.workflowdesigner.utils.FileCommonUtils#write(java.lang.String, java.lang.String, java.lang.String)}.
   */
  @Test
  public void testWriteStringStringString() {
  }

  /**
   * Test method for {@link org.onap.sdc.workflowdesigner.utils.FileCommonUtils#write(java.lang.String, java.lang.String[])}.
   */
  @Test
  public void testWriteStringStringArray() {
  }

  /**
   * Test method for {@link org.onap.sdc.workflowdesigner.utils.FileCommonUtils#write(java.lang.String, java.lang.String[], java.lang.String)}.
   */
  @Test
  public void testWriteStringStringArrayString() {
  }

}