const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(peocess.env.SUPABASE_URL, process.env.SUPABASE_KEY);

module.exports = {
    supabase
}