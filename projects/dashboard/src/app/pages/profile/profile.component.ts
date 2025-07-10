import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-container">
      <div class="profile-header">
        <h1>Profile</h1>
        <p class="subtitle">Manage your account information and preferences</p>
      </div>
      
      <div class="profile-content">
        <div class="profile-card">
          <div class="profile-avatar">
            <div class="avatar-placeholder">
              <i class="bi bi-person-fill"></i>
            </div>
            <button class="avatar-edit-btn">
              <i class="bi bi-camera"></i>
            </button>
          </div>
          
          <div class="profile-info">
            <h2>John Doe</h2>
            <p class="role">Frontend Developer</p>
            <p class="email">john.doe&#64;example.com</p>
          </div>
        </div>
        
        <div class="profile-sections">
          <div class="section">
            <h3>Personal Information</h3>
            <div class="form-grid">
              <div class="form-group">
                <label>First Name</label>
                <input type="text" value="John" readonly>
              </div>
              <div class="form-group">
                <label>Last Name</label>
                <input type="text" value="Doe" readonly>
              </div>
              <div class="form-group">
                <label>Email</label>
                <input type="email" value="john.doe&#64;example.com" readonly>
              </div>
              <div class="form-group">
                <label>Phone</label>
                <input type="tel" value="+1 (555) 123-4567" readonly>
              </div>
            </div>
            <button class="edit-btn">Edit Information</button>
          </div>
          
          <div class="section">
            <h3>Account Settings</h3>
            <div class="settings-list">
              <div class="setting-item">
                <div class="setting-info">
                  <h4>Two-Factor Authentication</h4>
                  <p>Add an extra layer of security to your account</p>
                </div>
                <button class="toggle-btn">Enable</button>
              </div>
              <div class="setting-item">
                <div class="setting-info">
                  <h4>Email Notifications</h4>
                  <p>Receive updates about your account activity</p>
                </div>
                <button class="toggle-btn active">Enabled</button>
              </div>
              <div class="setting-item">
                <div class="setting-info">
                  <h4>Privacy Mode</h4>
                  <p>Control who can see your profile information</p>
                </div>
                <button class="toggle-btn">Enable</button>
              </div>
            </div>
          </div>
          
          <div class="section">
            <h3>Activity</h3>
            <div class="activity-stats">
              <div class="stat">
                <span class="stat-number">127</span>
                <span class="stat-label">Components Viewed</span>
              </div>
              <div class="stat">
                <span class="stat-number">23</span>
                <span class="stat-label">Projects Created</span>
              </div>
              <div class="stat">
                <span class="stat-number">45</span>
                <span class="stat-label">Days Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .profile-header {
      margin-bottom: 2rem;
    }

    .profile-header h1 {
      font-size: 2rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 0.5rem 0;
    }

    .subtitle {
      color: var(--text-secondary);
      margin: 0;
    }

    .profile-card {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 2rem;
      display: flex;
      align-items: center;
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .profile-avatar {
      position: relative;
    }

    .avatar-placeholder {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: var(--primary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--white);
      font-size: 2rem;
    }

    .avatar-edit-btn {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: var(--bg-primary);
      border: 2px solid var(--border-color);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--text-secondary);
      transition: var(--transition);
    }

    .avatar-edit-btn:hover {
      background: var(--primary-color);
      color: var(--white);
    }

    .profile-info h2 {
      margin: 0 0 0.25rem 0;
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .role {
      color: var(--primary-color);
      font-weight: 500;
      margin: 0 0 0.5rem 0;
    }

    .email {
      color: var(--text-secondary);
      margin: 0;
    }

    .profile-sections {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .section {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 1.5rem;
    }

    .section h3 {
      margin: 0 0 1.5rem 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-group label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-secondary);
    }

    .form-group input {
      padding: 0.75rem;
      border: 1px solid var(--border-color);
      border-radius: 6px;
      background: var(--bg-primary);
      color: var(--text-primary);
      font-size: 0.875rem;
    }

    .edit-btn {
      background: var(--primary-color);
      color: var(--white);
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      font-weight: 500;
      cursor: pointer;
      transition: var(--transition);
    }

    .edit-btn:hover {
      opacity: 0.9;
    }

    .settings-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .setting-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      background: var(--bg-primary);
      border-radius: 8px;
    }

    .setting-info h4 {
      margin: 0 0 0.25rem 0;
      font-size: 1rem;
      font-weight: 500;
      color: var(--text-primary);
    }

    .setting-info p {
      margin: 0;
      font-size: 0.875rem;
      color: var(--text-secondary);
    }

    .toggle-btn {
      padding: 0.5rem 1rem;
      border: 1px solid var(--border-color);
      border-radius: 6px;
      background: var(--bg-secondary);
      color: var(--text-secondary);
      cursor: pointer;
      transition: var(--transition);
      font-size: 0.875rem;
    }

    .toggle-btn.active {
      background: var(--primary-color);
      color: var(--white);
      border-color: var(--primary-color);
    }

    .toggle-btn:hover {
      border-color: var(--primary-color);
    }

    .activity-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
    }

    .stat {
      text-align: center;
      padding: 1rem;
      background: var(--bg-primary);
      border-radius: 8px;
    }

    .stat-number {
      display: block;
      font-size: 2rem;
      font-weight: 600;
      color: var(--primary-color);
      margin-bottom: 0.25rem;
    }

    .stat-label {
      font-size: 0.875rem;
      color: var(--text-secondary);
    }

    @media (max-width: 768px) {
      .profile-container {
        padding: 1rem;
      }

      .profile-card {
        flex-direction: column;
        text-align: center;
        gap: 1rem;
      }

      .form-grid {
        grid-template-columns: 1fr;
      }

      .setting-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }
    }
  `]
})
export class ProfileComponent {

}
