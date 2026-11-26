import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xwzrmxwdshgztudtrfib.supabase.co";
const supabaseKey = "sb_publishable_pJ-kAi8zqoDIBf3GqjsmiA_0RtZ_6pV";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);