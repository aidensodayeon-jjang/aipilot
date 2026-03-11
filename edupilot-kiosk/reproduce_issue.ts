
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

async function testRLS() {
    console.log('Testing RLS policies...');

    // 1. Test Students (Should work)
    console.log('1. Testing Students (Public Read)...');
    const { data: students, error: studentError } = await supabase
        .from('students')
        .select('*')
        .limit(1);

    if (studentError) {
        console.error('❌ Students Read Failed:', studentError.message);
    } else {
        console.log('✅ Students Read Success:', students?.length ?? 0, 'rows');
    }

    // 2. Test Classes (Likely Fail)
    console.log('\n2. Testing Classes (Public Read)...');
    const { data: classes, error: classError } = await supabase
        .from('classes')
        .select('*')
        .limit(1);

    if (classError) {
        console.error('❌ Classes Read Failed:', classError.message);
    } else if (classes && classes.length === 0) {
        console.log('⚠️ Classes Read returned 0 rows (Likely RLS blocking if data exists)');
    } else {
        console.log('✅ Classes Read Success:', classes?.length ?? 0, 'rows');
    }

    // 3. Test Enrollments (Likely Fail)
    console.log('\n3. Testing Enrollments (Public Read)...');
    const { data: enrollments, error: enrollError } = await supabase
        .from('enrollments')
        .select('*')
        .limit(1);

    if (enrollError) {
        console.error('❌ Enrollments Read Failed:', enrollError.message);
    } else if (enrollments && enrollments.length === 0) {
        console.log('⚠️ Enrollments Read returned 0 rows (Likely RLS blocking if data exists)');
    } else {
        console.log('✅ Enrollments Read Success:', enrollments?.length ?? 0, 'rows');
    }
}

testRLS();
