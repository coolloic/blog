---
title: "Source: Notebook: Driver-Licence Recognizer Lab"
summary: "The owner's hands-on lab that trains a YOLO detector to find licence fields, crops them, reads them with EasyOCR, validates with regex and serves JSON via FastAPI, with privacy and production notes."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "documents", "ocr", "tutorial"]
---

- **What:** tutorial page from the owner's Notebook
- **Author/publisher:** coolloic (site owner)
- **Date:** undated; read 2026-11-14
- **Original:** [Lab: train a driver-licence recognizer](https://coolloic.github.io/Notebook/license-ml-lab.html)

## Summary

A beginner-oriented, end-to-end lab for structured extraction from photographed ID cards. An object detector (Ultralytics YOLO, labelled in Label Studio) locates the card type and each field; fields are cropped and read with EasyOCR; plain-code parsing and regex validation turn noisy strings into JSON; a FastAPI endpoint serves it. It opens with a privacy section because licences are sensitive personal data.

## Key claims

- Detect-then-crop-then-OCR beats running OCR on the whole photo, because OCR reads small isolated regions.
- Raw OCR text is noisy; validate formats in code and reject what does not fit, with a human in the loop for anything important.
- Accuracy levers: upscale small crops, grayscale, de-skew; warp the card to a flat rectangle before detection.
- Alternatives: PaddleOCR or Tesseract for OCR; layout models such as Donut or LayoutLMv3 can read structured fields end to end instead of crop-then-OCR.
- Production: active learning on low-confidence cases, ONNX export, reject blurry inputs, never auto-approve on a shaky read.
- Privacy: lawful basis/consent, data minimization, encryption, retention policy, synthetic data for training.

## Feeds

[Document processing](../concepts/document-processing.md)
