import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  console.log('API Route: /api/location called');
  try {
    const headers = request.headers;
    
    // Read headers forwarded by middleware
    const country = headers.get('x-visitor-country') || 'Unknown';
    const city = headers.get('x-visitor-city') || 'Unknown';
    const region = headers.get('x-visitor-region') || 'Unknown';
    const latitude = headers.get('x-visitor-latitude') || 'Unknown';
    const longitude = headers.get('x-visitor-longitude') || 'Unknown';
    
    const visitData = {
        country, 
        city, 
        region, 
        latitude, 
        longitude
    };
    
    console.log('API Route: Inserting into Supabase visits table:', visitData);

    const { error } = await supabase
        .from('visits')
        .insert(visitData);

    if (error) {
        console.error('API Route: Error inserting into Supabase:', error);
        throw error;
    }
    
    console.log('API Route: Successfully inserted into Supabase');

    return NextResponse.json({ success: true, message: 'Visit logged' });
  } catch (error) {
    console.error('Error logging visit:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
