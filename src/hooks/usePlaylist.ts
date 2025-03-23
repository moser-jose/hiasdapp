import { useState } from 'react'
import { hymnService } from '../services/HymnService'
import { Hymn, Playlist } from '@/types/hymnsTypes'
import { playlistService } from '../services/PlaylistService'

export function usePlaylist() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const createPlaylist = async (data: Playlist) => {
    try {
      setIsLoading(true)
      await playlistService.create(data)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }

  const getAllPlaylists = async () => {
    try {
      setIsLoading(true)
      return await playlistService.getAll()
    } catch (err) {
      setError(err as Error)
      return []
    } /* finally {
      setIsLoading(false)
    } */
  }

  const getPlaylistById = async (id: number) => {
    try {
      return await playlistService.findById(id)
    } catch (err) {
      setError(err as Error)
      return null
    }
  }

  const addHymnToPlaylist = async (id: number, hymn: number) => {
    try {
      return await playlistService.addHymnToPlaylist(id, hymn)
    } catch (err) {
      setError(err as Error)
    }
  }

  const removeHymnFromPlaylist = async (id: number, hymn: number) => {
    try {
      return await playlistService.removeHymnFromPlaylist(id, hymn)
    } catch (err) {
      setError(err as Error)
    }
  }

  const updatePlaylist = async (id: number, hymn: number) => {
    try {
      return await playlistService.updatePlaylist(id, hymn)
    } catch (err) {
      setError(err as Error)
    }
  }

  const deletePlaylist = async (id: number) => {
    try {
      return await playlistService.deletePlaylist(id)
    } catch (err) {
      setError(err as Error)
    }
  }

  return {
    createPlaylist,
    getAllPlaylists,
    getPlaylistById,
    addHymnToPlaylist,
    removeHymnFromPlaylist,
    updatePlaylist,
    deletePlaylist,
    isLoading,
    error,
  }
}
