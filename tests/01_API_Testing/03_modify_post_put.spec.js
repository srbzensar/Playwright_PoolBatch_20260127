import { test, expect } from '@playwright/test';

test('update post with id 12 and validate response', async ({ request }) => {
  
    const url = "https://jsonplaceholder.typicode.com/posts/12";

    const updatePayload = {
        id: 12,
        title: "foo",
        body: "bar",
        userId: 2
    };

// Define headers separately
    const headers = {
        'Content-type': 'application/json; charset=UTF-8'
    };

    const response = await request.put(url, { data: updatePayload, headers: headers });

    // Validate status code
    expect(response.status()).toBe(200);

       // Validate JSON body
    const jsonData = await response.json();
    console.log('Updated Response JSON:', jsonData);

    expect(jsonData.id).toBe(updatePayload.id);
    expect(jsonData.userId).toBe(updatePayload.userId);
    expect(jsonData.title).toBe(updatePayload.title); 
    expect(jsonData.body).toBe(updatePayload.body);
});
