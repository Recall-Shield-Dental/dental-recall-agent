# 🦷 Dental Office Setup Guide - HIPAA-Compliant Recall System

This guide explains what information we need from your dental practice to set up the AI-powered appointment reminder system.

---

## 📋 Required Information Checklist

### 1. **Practice Information**
We need these details to personalize appointment reminders:

- [ ] **Practice Name** (e.g., "Smile Dental Care")
- [ ] **Practice Address** (for timezone calculations)
- [ ] **Business Hours** (default: 8am-6pm, adjust if different)
- [ ] **Time Zone** (e.g., "America/New_York", "America/Los_Angeles")
- [ ] **Practice Phone Number** (for patient callbacks)
- [ ] **Practice Website** (optional, for branding)

**Example:**
```yaml
practice_name: "Smile Dental Care"
practice_address: "123 Main St, Austin, TX 78701"
business_hours: "8:00 AM - 6:00 PM"
timezone: "America/Chicago"
practice_phone: "+1-512-555-0100"
```

---

### 2. **Twilio Healthcare Account** (Required for HIPAA Compliance)
⚠️ **Standard WhatsApp Business API is NOT HIPAA-compliant**

You must have:
- [ ] **Twilio Account SID** (starts with `AC...`)
- [ ] **Twilio Auth Token** (secret key)
- [ ] **Twilio WhatsApp-enabled Phone Number** (e.g., `+14155238886`)
- [ ] **Business Associate Agreement (BAA)** signed with Twilio

**How to get this:**
1. Sign up at [Twilio Healthcare](https://www.twilio.com/hipaa)
2. Request BAA coverage (free for healthcare providers)
3. Enable WhatsApp on your Twilio number
4. Copy credentials from [Twilio Console](https://console.twilio.com)

**Example:**
```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_secret_auth_token_here
TWILIO_WHATSAPP_NUMBER=+14155238886
```

---

### 3. **Airtable Database Setup**
We'll create a HIPAA-compliant database to store appointment data.

#### Required Fields in Airtable Base:

| Field Name | Type | Purpose | Example |
|------------|------|---------|---------|
| `Patient_ID` | Single Line Text | Unique identifier (NO NAMES) | `PAT-2024-001` |
| `Patient_Phone` | Phone Number | WhatsApp contact (encrypted) | `+1-512-555-0123` |
| `Appointment_DateTime` | Date/Time | When appointment is scheduled | `2024-11-20 10:00 AM` |
| `Status` | Single Select | Appointment status | `SCHEDULED`, `CONFIRMED`, `CANCELLED` |
| `Reminder_48h_Sent` | Checkbox | Was 48h reminder sent? | ☑️ / ☐ |
| `Reminder_24h_Sent` | Checkbox | Was 24h reminder sent? | ☑️ / ☐ |
| `Consent_Timestamp` | Date/Time | When patient consented to WhatsApp | `2024-11-01 2:30 PM` |
| `Reschedule_Link` | URL | Calendly link for rescheduling | `https://calendly.com/practice/reschedule` |

#### What we need from you:
- [ ] **Airtable API Key** ([Generate here](https://airtable.com/create/tokens))
- [ ] **Airtable Base ID** (starts with `app...`)
- [ ] **Airtable Table Name** (e.g., `Appointments`)

**Example:**
```env
AIRTABLE_API_KEY=patAbCdEfGhIjKlMnOpQrStUvWxYz123456
AIRTABLE_BASE_ID=appXyZ123AbC456DeF
AIRTABLE_TABLE_NAME=Appointments
```

---

### 4. **Patient Consent Requirements** (HIPAA Critical)
⚠️ **You CANNOT send WhatsApp messages without documented consent**

#### What you must collect from each patient:

1. **Verbal or Written Consent Form**
   - Patient acknowledges WhatsApp is not fully encrypted
   - Patient agrees to receive appointment reminders via WhatsApp
   - Patient can opt-out at any time

2. **Sample Consent Language:**
   > "I consent to receive appointment reminders from [PRACTICE_NAME] via WhatsApp. I understand that WhatsApp messages may not be fully encrypted and I accept this risk. I can opt-out by replying STOP at any time."

3. **Store in Airtable:**
   - Record `Consent_Timestamp` when patient agrees
   - Keep signed consent forms on file (paper or digital)

**Our system BLOCKS any message if `Consent_Timestamp` is missing.**

---

### 5. **Calendly Integration** (For Rescheduling)

We need your Calendly account to let patients reschedule easily:

- [ ] **Calendly Event Type URL** (e.g., `https://calendly.com/yourpractice/appointment`)
- [ ] **Calendly API Key** (optional, for advanced tracking)

**Example:**
```env
CALENDLY_RESCHEDULE_LINK=https://calendly.com/smile-dental/reschedule
```

---

### 6. **WhatsApp Message Templates** (Must Be Pre-Approved)

You need to submit these templates to WhatsApp for approval (takes 3-5 business days):

#### **Template 1: 48-Hour Reminder**
```
Hi! Reminder: You have an appointment at {{practice_name}} on {{date}} at {{time}}. 
Reply CONFIRM or visit {{reschedule_link}} to reschedule.
```

#### **Template 2: 24-Hour Reminder**
```
Hi! Your appointment at {{practice_name}} is tomorrow at {{time}}. 
See you soon! Need to reschedule? {{reschedule_link}}
```

**What we need:**
- [ ] Approved template names from WhatsApp Business Manager
- [ ] Template IDs (e.g., `reminder_48h`, `reminder_24h`)

---

## 🔐 Security & Compliance Checklist

Before launch, ensure:

- [ ] ✅ Twilio BAA is signed
- [ ] ✅ Airtable has field-level encryption enabled
- [ ] ✅ All patient consent records are documented
- [ ] ✅ Practice staff trained on HIPAA protocols
- [ ] ✅ Audit logging is enabled in Airtable
- [ ] ✅ No patient names/PHI in message templates

---

## 🚀 Setup Timeline

| Step | Time Required | Who Does It |
|------|---------------|-------------|
| 1. Gather practice information | 10 minutes | Dental office |
| 2. Sign up for Twilio Healthcare + BAA | 2-3 days | Dental office |
| 3. Set up Airtable database | 1 hour | Us + dental office |
| 4. Submit WhatsApp templates for approval | 3-5 days | Dental office (via Meta) |
| 5. Configure crewAI agents | 2 hours | Us |
| 6. Test with 5 mock appointments | 1 hour | Both |
| 7. Go live with real patients | Day 1 | Dental office |

**Total time: ~7-10 business days**

---

## 📞 What Happens After Setup?

1. **Automated reminders run twice daily** (10am and 2pm)
2. **48-hour reminders** sent 2 days before appointments
3. **24-hour reminders** sent 1 day before appointments
4. **HIPAA compliance checks** happen before EVERY message
5. **Patients can reschedule instantly** via Calendly link
6. **You get weekly reports** on no-show reduction

---

## ❓ Frequently Asked Questions

### Q: What if a patient doesn't have WhatsApp?
**A:** The system skips them automatically. They won't receive reminders via this system.

### Q: Can patients opt-out?
**A:** Yes. If they reply "STOP", we immediately mark them as opted-out in Airtable.

### Q: What if there's a HIPAA violation?
**A:** The system BLOCKS the message and logs it. You get an alert within 5 minutes.

### Q: How much does this cost per month?
**A:** Twilio: ~$0.005/message (about $15-30/month for 500 patients). Airtable: $12/month.

### Q: Do we need to change our practice management software?
**A:** No. We sync with your existing system via Airtable webhooks.

---

## 📧 Ready to Get Started?

Fill out the checklist above and email the information to:
**setup@dentalrecallai.com**

Or schedule a 15-minute call: [calendly.com/dental-setup](https://calendly.com)

---

**Last Updated:** November 18, 2025  
**Version:** 1.0  
**HIPAA Compliant:** ✅
