const { createClient } = require('@supabase/supabase-js');

const supabase = createClient("https://ksyyinlqfyuvxisgvzwt.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzeXlpbmxxZnl1dnhpc2d2end0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjAwNjA3MzQsImV4cCI6MTk3NTYzNjczNH0.pSINRJU55cwEuuH4eHz0tGoC_t6wG2z6W4zXPPXe1Gg");

module.exports = {
    supabase
}