# 🏗️ GoInsights Frontend Architecture

The **GoInsights frontend** is a specialized Geotab Add-In built to serve as a unified intelligence layer. It is architected to handle complex data visualization and real-time AI interaction within the constrained environment of a MyGeotab Iframe.

---

## 🏛️ Technical Stack

- **Core:** Angular v21 (Standalone Architecture)  
- **State Management:** RxJS `BehaviorSubjects` for real-time telemetry updates  
- **Styling:** SCSS with Tailwind Flexbox/Grid for a responsive, "single-pane-of-glass" layout  
- **Deployment:** Vercel 

---

## 🧩 Architectural Components

### 1️⃣ Geotab Integration Layer (The Bridge)

**Add-in Lifecycle**  
- Utilizes `geotab.addin.initialize` and `geotab.addin.focus`  
- Maintains state sync with the MyGeotab parent shell  

**Authentication**  
- Captures and securely stores session credentials:
  - Session ID  
  - Server  
  - Database  
- Passes credentials to backend for authorized data fetching  

---

### 2️⃣ The Dashboard Engine

**Telemetry Cards**  
- Modular component architecture  
- Each card (Trips, Safety, Fuel, Faults) operates as an independent subscriber to the telemetry stream  

**Insight Overlay**  
- Abstraction layer mapping raw metrics to Google Gemini summary text  
- Provides "Plain English" explanations of fleet performance deltas  

---

### 3️⃣ InsightsBot UI (Conversational Layer)

**Streaming Interface**  
- Handles asynchronous AI responses  
- Dynamically renders:
  - Text  
  - Structured data (tables)  

**Contextual Awareness**  
- Sends current dashboard state (selected date range / vehicles) to backend  
- Enables AI to respond with contextual intelligence  

---

## 🔄 Data Flow (Frontend)

1. **User Action:** Manager opens the Add-in  
2. **Handshake:** Frontend requests session tokens from Geotab  
3. **Aggregation:** Frontend calls the Railway Backend for fleet-wide summaries  
4. **Render:** Telemetry displayed alongside Gemini-generated insights  
5. **Interaction:** User queries InsightsBot; frontend renders Markdown + dynamic data tables  

---
