# MetaSigns — ASL Aspire Unity Learning Project

**Project type:** Interactive education / AI-assisted learning  
**Role:** AI & ML Developer (ASL Aspire)

## Overview
MetaSigns is an interactive Unity learning experience designed around K–12 concepts and American Sign Language (ASL) video feedback. Learners select concept words in a Unity interface and receive visual feedback and a matching ASL video where available.

## Architecture and features
- **Unity + C#:** Interactive lesson interface using TextMeshPro, hover/select states, and answer feedback.
- **Concept ingestion:** Subject and concept words loaded from a spreadsheet via NPOI.
- **Video library:** Local `Assets/Resources/aslVideos/<word>.mp4` resources with case-insensitive word matching.
- **AI integration:** Experimentation with LLaMA language models and a Python FastAPI service to support learning workflows.
- **User feedback:** Visual hover, selected, correct, and incorrect states and ASL playback.

## Technologies
Unity, C#, TextMeshPro, Python, FastAPI, LLaMA, NPOI, Excel, ASL video assets.

## Repository scope
This is a **technical case study**, not a release of ASL Aspire's proprietary Unity project, model weights, teaching content, or ASL video assets. The original Unity source code and media are not included because permission to publish them has not been established. A public source release would require authorization and removal of any sensitive or licensed materials.

## Potential next steps
Build a clean-room demonstration with original sample lesson data, freely licensed ASL assets, automated Unity tests, and a reproducible local AI service.
