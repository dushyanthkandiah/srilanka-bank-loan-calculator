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
    const userAgent = headers.get('x-visitor-ua') || '';

    // Simple device detection from User-Agent
    let device = 'Unknown';
    if (/iPhone/i.test(userAgent)) device = 'iPhone';
    else if (/iPad/i.test(userAgent)) device = 'iPad';
    else if (/Android/i.test(userAgent)) {
        if (/Samsung/i.test(userAgent) || /SM-/i.test(userAgent)) device = 'Samsung';
        else if (/Pixel/i.test(userAgent)) device = 'Pixel';
        else device = 'Android Device';
    }
    else if (/Windows/i.test(userAgent)) device = 'Windows PC';
    else if (/Macintosh/i.test(userAgent)) device = 'Mac';
    else if (/Linux/i.test(userAgent)) device = 'Linux';
    
    const visitData = {
        country, 
        city, 
        region, 
        latitude, 
        longitude,
        device
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
