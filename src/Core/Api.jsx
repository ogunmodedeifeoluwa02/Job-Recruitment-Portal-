const API_BASE_URL = 'https://jobportal.collinswilson.com';

class Api {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Only add auth header if a token is available
    const token = localStorage.getItem('authToken');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async get(endpoint) {
    return this.request(endpoint, {
      method: 'GET',
    });
  }

  async post(endpoint, body) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  async put(endpoint, body) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  async patch(endpoint, body) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }

  // Job-related endpoints
  async getCategories() {
    return this.get('/api/utils/categories');
  }

  async getJobs() {
    return this.get('/api/jobs');
  }

  async searchJobs(query) {
    return this.get(`/api/jobs/search?${query}`);
  }

  async getJob(jobId) {
    return this.get(`/api/jobs/${jobId}`);
  }

  async createJob(jobData) {
    return this.post('/api/jobs', jobData);
  }

  async updateJob(jobId, jobData) {
    return this.put(`/api/jobs/${jobId}`, jobData);
  }

  async deleteJob(jobId) {
    return this.delete(`/api/jobs/${jobId}`);
  }

  // Application-related endpoints
  async getApplications() {
    return this.get('/api/applications');
  }

  async getMyApplications() {
    return this.get('/api/applications/my-applications');
  }

  async updateApplicationStatus(jobId, applicantId, statusData) {
    return this.patch(`/api/applications/${jobId}/${applicantId}/status`, statusData);
  }

  // Auth endpoints
  async register(userData) {
    return this.post('/api/auth/register', userData);
  }

  async login(credentials) {
    return this.post('/api/auth/login', credentials);
  }

  // Profile endpoints
  async getProfile() {
    return this.get('/api/profile');
  }

  async updateProfile(profileData) {
    return this.put('/api/profile', profileData);
  }
}

const api = new Api();
export default api;
