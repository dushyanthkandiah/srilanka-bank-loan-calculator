import { NextRequest, NextResponse } from 'next/server';
import { appendToSheet } from '@/lib/googleSheets';

export async function GET(request: NextRequest) {
    console.log('API Route: /api/location called');
    try {
        const headers = request.headers;
        debugger;
        // Read headers forwarded by middleware
        const country = headers.get('x-visitor-country') || 'Unknown';
        const city = headers.get('x-visitor-city') || 'Unknown';
        const region = headers.get('x-visitor-region') || 'Unknown';
        const latitude = headers.get('x-visitor-latitude') || 'Unknown';
        const longitude = headers.get('x-visitor-longitude') || 'Unknown';

        const timestamp = new Date().toISOString();

        const row = [timestamp, country, city, region, latitude, longitude];
        console.log('API Route: Appending to sheet:', row);

        await appendToSheet(row);
        
        console.log('API Route: Successfully appended to sheet');

        return NextResponse.json({ success: true, message: 'Visit logged' });
    } catch (error) {
        console.error('Error logging visit:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
