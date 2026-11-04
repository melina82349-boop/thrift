
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Your THRIFT Supabase project URL
const SUPABASE_URL = "https://tjmzzhytzymgcbekelfe.supabase.co";

// Paste your Publishable key between the quotation marks
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_tOoQ0iYoEPbnSNXYx9mVCQ_dvbnbNVR";

// Create Supabase connection
export const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);
