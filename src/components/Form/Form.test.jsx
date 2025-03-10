import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, test, expect, beforeAll } from 'vitest';
import AddSongForm from './Form';
import { postVideo } from '../Helper/supabaseClient';

// Mock supabase client
vi.mock('../Helper/supabaseClient', () => ({
  postVideo: vi.fn(),
}));

// Setup userEvent
beforeAll(() => {
  global.user = userEvent.setup();
});

test('submits valid form and adds song to list', async () => {
  const mockNewSong = { 
    id: 1, 
    artist: 'Test Artist', 
    title: 'Test Song', 
    url: 'https://youtube.com/test', 
    message: 'Test message', 
    username: 'testuser' 
  };
  postVideo.mockResolvedValue(mockNewSong);
  const mockSetVideos = vi.fn();
  
  render(<AddSongForm videos={[]} setVideos={mockSetVideos} />);

  await global.user.type(screen.getByLabelText('Your name'), 'testuser');
  await global.user.type(screen.getByLabelText('Song name'), 'Test Song');
  await global.user.type(screen.getByLabelText('Artist'), 'Test Artist');
  await global.user.type(screen.getByLabelText('YouTube URL'), 'https://youtube.com/test');
  await global.user.type(screen.getByLabelText('Your message'), 'Test message');

  await global.user.click(screen.getByRole('button', { name: 'Add Song' }));

  expect(postVideo).toHaveBeenCalledWith({
    artist: 'Test Artist',
    title: 'Test Song',
    url: 'https://youtube.com/test',
    message: 'Test message',
    username: 'testuser',
  });

  // Verify form reset
  expect(screen.getByLabelText('Your name')).toHaveValue('');
  expect(screen.getByLabelText('Song name')).toHaveValue('');
});

// Keep other tests the same but use global.user instead of userEvent directly