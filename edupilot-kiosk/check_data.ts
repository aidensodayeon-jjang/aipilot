
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load env vars manually
const envPath = path.resolve(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars: Record<string, string> = {};

envContent.split('\n').forEach((line: string) => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
        envVars[match[1].trim()] = match[2].trim();
    }
});

const supabaseUrl = envVars['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseKey = envVars['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkData() {
    console.log('Checking DB Data...');

    const { data: students, error: sError } = await supabase.from('students').select('count', { count: 'exact', head: true });
    if (sError) console.error('Error fetching students:', sError.message);
    else console.log('Students count:', students);

    const { data: classes, error: cError } = await supabase.from('classes').select('*');
    if (cError) console.error('Error fetching classes:', cError.message);
    else {
        console.log('Total Classes count:', classes.length);
        const fridayClasses = classes.filter(c => c.day_of_week === 'FRI' || c.day_of_week === 'Friday' || c.day_of_week === '금요일');
        console.log('Friday Classes count:', fridayClasses.length);
        if (fridayClasses.length > 0) {
            console.log('Friday Sample:', JSON.stringify(fridayClasses.slice(0, 3), null, 2));
        } else {
            const days = [...new Set(classes.map(c => c.day_of_week))];
            console.log('Available days in DB:', days);
        }
    }
}

checkData();
